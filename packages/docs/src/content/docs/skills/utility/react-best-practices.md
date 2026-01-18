---
title: React Best Practices
description: Performance optimization guidelines cho React và Next.js từ Vercel Engineering
---

import { Aside, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/react-best-practices` là Utility Skill cung cấp 45+ performance optimization rules cho React và Next.js.

<Aside type="tip">
  Sử dụng skill này khi writing, reviewing, hoặc refactoring React/Next.js code để ensure optimal performance.
</Aside>

## Rule Categories

| Category | Priority | Rules |
|----------|----------|-------|
| Eliminating Waterfalls | CRITICAL | 3 |
| Bundle Size Optimization | CRITICAL | 4 |
| Server-Side Performance | HIGH | 3 |
| Client-Side Data Fetching | MEDIUM-HIGH | 2 |
| Re-render Optimization | MEDIUM | 3 |
| Rendering Performance | MEDIUM | 3 |
| JavaScript Performance | LOW-MEDIUM | 3 |
| Advanced Patterns | LOW | 2 |

## Quick Start

```
/react-best-practices Review this component for performance issues
```

Claude sẽ analyze và identify:
- Performance anti-patterns
- Optimization opportunities
- Specific rule violations

## Critical Rules

### Eliminating Waterfalls

<Tabs>
  <TabItem label="async-defer-await">
    **Problem**: Sequential awaits block parallel execution

    ```typescript
    // BAD
    async function getData() {
      const user = await fetchUser();
      const posts = await fetchPosts(); // Waits for user!
      return { user, posts };
    }
    ```

    ```typescript
    // GOOD
    async function getData() {
      const [user, posts] = await Promise.all([
        fetchUser(),
        fetchPosts()
      ]);
      return { user, posts };
    }
    ```
  </TabItem>

  <TabItem label="async-parallel">
    **Problem**: Dependent fetches in sequence

    ```typescript
    // BAD
    const user = await fetchUser(id);
    const orders = await fetchOrders(user.id); // Depends on user
    ```

    ```typescript
    // GOOD - If possible, fetch in parallel
    const [user, orders] = await Promise.all([
      fetchUser(id),
      fetchOrdersByUserId(id) // Direct fetch
    ]);
    ```
  </TabItem>

  <TabItem label="async-suspense-boundaries">
    **Problem**: Large Suspense boundaries block everything

    ```tsx
    // BAD
    <Suspense fallback={<FullPageLoader />}>
      <Header />
      <MainContent />
      <Sidebar />
    </Suspense>
    ```

    ```tsx
    // GOOD - Granular boundaries
    <Header /> {/* No suspense needed */}
    <Suspense fallback={<ContentSkeleton />}>
      <MainContent />
    </Suspense>
    <Suspense fallback={<SidebarSkeleton />}>
      <Sidebar />
    </Suspense>
    ```
  </TabItem>
</Tabs>

### Bundle Size Optimization

<Tabs>
  <TabItem label="bundle-barrel-imports">
    **Problem**: Barrel imports load entire package

    ```typescript
    // BAD
    import { Button } from '@/components';
    // Loads ALL components!
    ```

    ```typescript
    // GOOD
    import { Button } from '@/components/Button';
    // Loads only Button
    ```
  </TabItem>

  <TabItem label="bundle-dynamic-imports">
    **Problem**: Heavy components loaded upfront

    ```tsx
    // BAD
    import Chart from 'heavy-chart-library';
    ```

    ```tsx
    // GOOD
    import dynamic from 'next/dynamic';

    const Chart = dynamic(() => import('heavy-chart-library'), {
      loading: () => <ChartSkeleton />,
      ssr: false
    });
    ```
  </TabItem>

  <TabItem label="bundle-defer-third-party">
    **Problem**: Analytics blocks rendering

    ```tsx
    // BAD - In head
    <Script src="analytics.js" />
    ```

    ```tsx
    // GOOD - Defer loading
    <Script
      src="analytics.js"
      strategy="lazyOnload"
    />
    ```
  </TabItem>

  <TabItem label="bundle-preload">
    **Problem**: Resources loaded too late

    ```tsx
    // GOOD - Preload on hover
    const prefetchProduct = () => {
      router.prefetch(`/product/${id}`);
    };

    <Link
      href={`/product/${id}`}
      onMouseEnter={prefetchProduct}
    >
      View Product
    </Link>
    ```
  </TabItem>
</Tabs>

## High Priority Rules

### Server-Side Performance

<Tabs>
  <TabItem label="server-cache-react">
    **Use React.cache() for request deduplication**

    ```typescript
    import { cache } from 'react';

    export const getUser = cache(async (id: string) => {
      const res = await fetch(`/api/users/${id}`);
      return res.json();
    });

    // Multiple calls in same request = 1 fetch
    const user1 = await getUser('123');
    const user2 = await getUser('123'); // Cached!
    ```
  </TabItem>

  <TabItem label="server-serialization">
    **Minimize data sent to client**

    ```typescript
    // BAD - Sends everything
    const user = await db.user.findFirst({ include: { all: true }});
    return <Profile user={user} />;
    ```

    ```typescript
    // GOOD - Select only needed fields
    const user = await db.user.findFirst({
      select: { id: true, name: true, avatar: true }
    });
    return <Profile user={user} />;
    ```
  </TabItem>

  <TabItem label="server-parallel-fetching">
    **Restructure for parallel data loading**

    ```tsx
    // BAD - Sequential in single component
    async function Page() {
      const user = await fetchUser();
      const posts = await fetchPosts();
      return <div>{/* render */}</div>;
    }
    ```

    ```tsx
    // GOOD - Parallel with nested components
    async function Page() {
      return (
        <Suspense>
          <UserSection />
          <PostsSection />
        </Suspense>
      );
    }

    async function UserSection() {
      const user = await fetchUser();
      return <UserCard user={user} />;
    }

    async function PostsSection() {
      const posts = await fetchPosts();
      return <PostList posts={posts} />;
    }
    ```
  </TabItem>
</Tabs>

## Medium Priority Rules

### Re-render Optimization

<Tabs>
  <TabItem label="rerender-memo">
    **Extract expensive work**

    ```tsx
    // BAD
    function List({ items, filter }) {
      // Runs on every render
      const filtered = items.filter(expensiveFilter);
      return <ul>{filtered.map(...)}</ul>;
    }
    ```

    ```tsx
    // GOOD
    function List({ items, filter }) {
      const filtered = useMemo(
        () => items.filter(expensiveFilter),
        [items, filter]
      );
      return <ul>{filtered.map(...)}</ul>;
    }
    ```
  </TabItem>

  <TabItem label="rerender-transitions">
    **Use startTransition for non-urgent updates**

    ```tsx
    // BAD - Blocks UI
    function SearchBox() {
      const [query, setQuery] = useState('');

      return (
        <input
          onChange={(e) => setQuery(e.target.value)}
        />
      );
    }
    ```

    ```tsx
    // GOOD - Non-blocking
    function SearchBox() {
      const [query, setQuery] = useState('');
      const [results, setResults] = useState([]);

      const handleChange = (e) => {
        setQuery(e.target.value); // Urgent
        startTransition(() => {
          setResults(search(e.target.value)); // Can be interrupted
        });
      };

      return <input onChange={handleChange} />;
    }
    ```
  </TabItem>

  <TabItem label="rerender-lazy-state-init">
    **Lazy initialization for expensive state**

    ```tsx
    // BAD - Runs on every render
    const [data, setData] = useState(expensiveComputation());
    ```

    ```tsx
    // GOOD - Runs only once
    const [data, setData] = useState(() => expensiveComputation());
    ```
  </TabItem>
</Tabs>

### Rendering Performance

```tsx
// rendering-animate-svg-wrapper
// BAD - Animate SVG directly
<motion.svg animate={{ rotate: 360 }} />

// GOOD - Animate wrapper div
<motion.div animate={{ rotate: 360 }}>
  <svg />
</motion.div>
```

```tsx
// rendering-content-visibility
// For long lists
<div style={{ contentVisibility: 'auto', containIntrinsicSize: '500px' }}>
  <ExpensiveComponent />
</div>
```

```tsx
// rendering-conditional-render
// BAD
{showModal && <Modal />}
{!showModal && null}

// GOOD
{showModal ? <Modal /> : null}
```

## JavaScript Performance

```typescript
// js-index-maps - Use Map for O(1) lookups
// BAD
const item = items.find(i => i.id === id);

// GOOD
const itemMap = new Map(items.map(i => [i.id, i]));
const item = itemMap.get(id);
```

```typescript
// js-batch-dom-css - Group CSS changes
// BAD
element.style.width = '100px';
element.style.height = '100px';
element.style.background = 'red';

// GOOD
element.style.cssText = 'width: 100px; height: 100px; background: red;';
// Or use className
element.className = 'my-styles';
```

## Usage Examples

### Review a Component

```
/react-best-practices Review this component:

function Dashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUser(userId).then(setUser);
    fetchPosts(userId).then(setPosts);
  }, [userId]);

  return <div>...</div>;
}
```

Claude will identify:
- Missing error handling
- Potential race condition
- Could use SWR for better caching
- Consider Server Component

### Optimize a Page

```
/react-best-practices How can I improve loading performance of this page?
```

## Best Practices Summary

1. **Fetch in parallel** when possible
2. **Use Server Components** for static content
3. **Lazy load** heavy components
4. **Avoid barrel imports** - import directly
5. **Memoize** expensive computations
6. **Use transitions** for non-urgent updates
7. **Preload** on hover/focus
8. **Minimize serialization** - select only needed fields

## Related

- [Brainstorming](/skills/producer/brainstorming/) - Plan React features
- [Reviewing](/skills/producer/reviewing/) - Review React code quality
- [UI/UX Pro Max](/skills/utility/ui-ux-pro-max/) - Design React components
