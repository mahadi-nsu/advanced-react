# React Deep Dive 🧠

React re-render আর performance নিয়ে হাতে-কলমে শেখার repo।
(Reference: *Advanced React* — Nadia Makarevich)

এক লাইনে মূল শিক্ষা:
> **State যে component-এ `useState` call হয়, re-render সেখান থেকে নিচে ছড়ায় — উপরে নয়।**
> তাই re-render আটকানোর আসল কৌশল: state আর slow component-কে আলাদা রাখা।

---

## 🚀 চালানো

```bash
npm install
npm run dev
```
তারপর http://localhost:5173

---

## 📚 Demo ১ — Modal & "the hook danger"

**সমস্যা:** `App`-এ `isOpen` state → button click → পুরো `App` re-render → `VerySlowComponent` (ইচ্ছাকৃত 500ms delay) আবার চলে → dialog খুলতে ল্যাগ।

**যা শিখলাম:**

| পদ্ধতি | কী করে | ফল |
|---|---|---|
| State নিচে নামানো (ছোট component-এ) | state isolate | ✅ সেরা |
| Custom hook (`useModalDialog`) | **logic** reuse করে, state isolate করে **না** | ⚠️ hook যে component-এ call হয়, state তার |
| `React.memo` | child-কে re-run থেকে বাঁচায় | 🩹 damage control |

**মূল পয়েন্ট — "hook danger":**
Hook state-কে *লুকায়, সরায় না*। `useModalDialog` সরাসরি `App`-এ call করলে state App-এই থাকে → re-render সমস্যা ফিরে আসে। তাই hook টা ছোট component-এর ভিতরে রাখলে performance + পরিষ্কার code দুটোই পাওয়া যায়।

> 👉 এই demo-র শেষ অবস্থা `master` branch-এ।

---

## 📚 Demo ২ — Scroll lag & "Elements as props"

**সমস্যা:** scrollable area-তে `position` state + slow component একই জায়গায়। প্রতি scroll → `setPosition` → re-render → slow জিনিস আবার চলে → scrolling ভয়ানক ল্যাগি।
state নামানো যাচ্ছে না, কারণ `onScroll` সবকিছু-মোড়ানো div-এ বসানো।

**সমাধান (composition):** slow জিনিসগুলো `App`-এ তৈরি করে `ScrollableWithMovingBlock`-এ **prop / children হিসেবে** পাঠাও।

```jsx
// App.jsx — slow জিনিস এখানে তৈরি (state-এর বাইরে)
<ScrollableWithMovingBlock>
  <VerySlowComponent />
  <BunchOfStuff />
</ScrollableWithMovingBlock>

// ScrollableWithMovingBlock — state এখানে, children শুধু বসায়
const ScrollableWithMovingBlock = ({ children }) => {
  const [position, setPosition] = useState(300);
  const onScroll = (e) => setPosition(getPosition(e.target.scrollTop));
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      {children}
    </div>
  );
};
```

**কেন কাজ করে (Element vs Component):**
- `<VerySlowComponent />` আসলে একটা **object** (`{ type, props }`) — একটা "চিরকুট"।
- Re-render-এ React পুরোনো আর নতুন চিরকুট **`Object.is`** দিয়ে মেলায়। একই হলে → **skip**।
- `children` তৈরি হয় `App`-এ। scroll-এ শুধু `ScrollableWithMovingBlock` re-render হয়, `App` নয় → `children` object একই থাকে → React skip করে → **smooth**।
- শুধু `MovingBlock` re-render হয় (ভিতরে তৈরি + `position` prop বদলায়) — ঠিক যা আমরা চাই।

> 👉 এই demo `scroll-rerender-problem` branch-এ।
> - commit `804af3f` → 🔴 laggy problem version
> - পরের commit → ✅ fixed (children-as-props)

---

## 🔑 সারসংক্ষেপ

1. **Component** re-render-এর দেয়াল বানায়; **Hook** বানায় না (শুধু logic reuse)।
2. State isolate করতে চাইলে → **নতুন component** লাগে।
3. React tree-তে **উপরে ওঠে না** — re-render নিচের দিকে ছড়ায়।
4. Element = object; reference একই থাকলে React re-render **skip** করে।
5. slow জিনিস **state-ওয়ালা component-এর বাইরে** তৈরি করো (props/children) → বাঁচবে।
6. `React.memo` হলো শেষ উপায় — আগে composition ভাবো।

---

## 🗂️ গুরুত্বপূর্ণ ফাইল

| ফাইল | কী |
|---|---|
| `src/App.jsx` | branch অনুযায়ী বর্তমান demo |
| `src/components/scrollable-with-moving-block.jsx` | state + scroll + children |
| `src/components/moving-block.jsx` | scroll-এর সাথে নড়া block |
| `src/components/useModalDialog.jsx` | hook demo |
| `src/components/very-slow-component.jsx` | 500ms কৃত্রিম delay (re-render টের পাওয়ার জন্য) |
