# React Deep Dive 🧠 — Modal & the "Hook Danger"

Custom hook দিয়ে re-render সমস্যা কীভাবে *লুকিয়ে* যায় (কিন্তু সমাধান হয় না), আর আসল সমাধান কী — তার হাতে-কলমে demo।
(Reference: *Advanced React* — Nadia Makarevich)

> 🔀 Scroll-based demo (Elements as props) আছে `scroll-rerender-problem` branch-এ।

---

## 🚀 চালানো

```bash
npm install
npm run dev
```
http://localhost:5173 → "Open dialog" button।

---

## 🎬 Setup

`App`-এ একটা modal আছে, সাথে `VerySlowComponent` — যেটায় ইচ্ছাকৃত **500ms** কৃত্রিম delay (re-render হচ্ছে কিনা চোখে টের পাওয়ার জন্য)।

```jsx
<Button onClick={open}>Open dialog</Button>
{dialog}
<VerySlowComponent />   {/* 500ms wait on every render */}
```

---

## 🔴 Problem — hook সরাসরি `App`-এ

প্রথমে code পরিষ্কার করতে modal-এর logic একটা custom hook-এ নিলাম:

```jsx
// useModalDialog.jsx
export const useModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const dialog = isOpen ? <ModalDialog onClose={close} /> : null;
  return { isOpen, open, close, dialog };
};
```

আর `App`-এ ব্যবহার করলাম:

```jsx
// App.jsx  — 🔴 দেখতে পরিষ্কার, কিন্তু slow
export default function App() {
  const { open, dialog } = useModalDialog();   // ⚠️ state App-এ চলে এলো
  return (
    <>
      <Button onClick={open}>Open dialog</Button>
      {dialog}
      <VerySlowComponent />
    </>
  );
}
```

**যা ঘটে:** button click → `setIsOpen` → **পুরো `App` re-render** → `VerySlowComponent` আবার 500ms `wait` চালায় → dialog খুলতে **~500ms ল্যাগ**।

---

## ⚠️ Hook-based approach-এ আসল issue

> **Hook state-কে লুকায়, সরায় না।**

`useState` যে component-এ **call** হয়, state সেই component-এর। hook মানে শুধু ওই কোড component-এর ভিতরে ঢুকে যাওয়া। তাই `useModalDialog()` যখন `App`-এ call হয় → state আসলে `App`-এর → `App` re-render হয়।

এটা তিনটা ক্ষেত্রেই সত্য (বইয়ের মূল পয়েন্ট):
- state hook থেকে return করা হোক বা না হোক,
- state `App`-এ সরাসরি ব্যবহার করা হোক বা না হোক,
- hook কিছু return করুক বা না করুক —

তবুও hook-এর ভিতরের `setState` চললে, **যে component hook call করেছে সে re-render হবেই**।

👉 মানে hook performance *উন্নত করে না* — শুধু state-টা চোখের আড়ালে নিয়ে যায়, তাই developer ভুল করে ভাবে "optimize হয়ে গেছে"। **এটাই "the hook danger"।**

---

## ✅ Solution — hook ছোট component-এর ভিতরে

state যেহেতু "যে component hook call করে" সেখানে বসে — তাই hook-টা `App` থেকে সরিয়ে একটা **ছোট dedicated component**-এ call করি:

```jsx
// ButtonWithModalDialog.jsx
const ButtonWithModalDialog = () => {
  const { open, dialog } = useModalDialog();   // state এখন এখানে isolate
  return (
    <>
      <Button onClick={open}>Open dialog</Button>
      {dialog}
    </>
  );
};
```

```jsx
// App.jsx  — ✅ পরিষ্কার + fast
export default function App() {
  return (
    <>
      <ButtonWithModalDialog />
      <VerySlowComponent />
    </>
  );
}
```

**এখন কী হয়:** click → `setIsOpen` → শুধু **`ButtonWithModalDialog`** re-render → React **উপরে `App`-এ ওঠে না** → `App` ও `VerySlowComponent` অক্ষত → **lag নেই, memo-ও লাগেনি**।

---

## 🔑 সারসংক্ষেপ

| | Hook | Component |
|---|---|---|
| কাজ | **logic** reuse | **UI** + re-render-এর সীমানা |
| state isolate করে? | ❌ না | ✅ হ্যাঁ |
| re-render আটকায়? | ❌ না | ✅ (state ভিতরে থাকলে) |

1. State যে component-এ `useState` call হয়, সেখানেই বসে — hook তা বদলায় না।
2. State isolate করতে চাইলে → **নতুন component** লাগে, hook নয়।
3. React re-render-এ tree-তে **উপরে ওঠে না**, নিচে ছড়ায়।
4. সেরা হলো **hook + ছোট component একসাথে** → logic-ও reuse, state-ও isolate।

> 🩹 বিকল্প (দুর্বল): hook App-এ রেখে `VerySlowComponent`-কে `React.memo` দিয়ে মোড়া। কাজ করে, কিন্তু এটা "damage control" — re-render থামে না, child-কে rerun থেকে বাঁচায় মাত্র। আগে composition ভাবো।

---

## 🗂️ গুরুত্বপূর্ণ ফাইল

| ফাইল | কী |
|---|---|
| `src/App.jsx` | ✅ solution (ButtonWithModalDialog ব্যবহার করে) |
| `src/components/ButtonWithModalDialog.jsx` | hook isolate করা ছোট component |
| `src/components/useModalDialog.jsx` | modal logic hook |
| `src/components/very-slow-component.jsx` | 500ms কৃত্রিম delay |
