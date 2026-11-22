# React Deep Dive 🧠 — Ch.3 Elements as Props (Practice)

Configuration ও flexibility-র জন্য "elements as props" — হাতে-কলমে playground।
(Reference: *Advanced React* — Nadia Makarevich, Chapter 3)

> অন্য branch: `master` = Modal/Hook danger · `scroll-rerender-problem` = Elements as props (performance দিক)

---

## 🚀 চালানো

```bash
npm install
npm run dev
```
http://localhost:5173 — তিনটা section দেখবে।

---

## 🧩 এই branch-এ কী আছে (reference)

| ফাইল | প্যাটার্ন |
|---|---|
| `components/config-button.jsx` | `icon` element as prop + `cloneElement` দিয়ে default size/color |
| `components/config-modal-dialog.jsx` | `children` (content) + `footer` (named element prop) |
| `components/three-columns-layout.jsx` | পুরোপুরি configurable — `leftColumn/middleColumn/rightColumn` |
| `components/icons.jsx` | `Loading / ErrorIcon / Warning / Avatar` (color + size prop নেয়) |
| `App.jsx` | তিনটা demo একসাথে |

---

## 💡 মূল ধারণা (এক নজরে)

- **Element as prop** = consumer-কে বলা: "যা খুশি দাও, আমি শুধু ঠিক জায়গায় বসাবো।" Config prop-এর পাহাড় (`iconColor`, `iconSize`, `isIconLeftAvatar`...) এড়ানো যায়।
- **children = শুধু একটা prop।** nested syntax (`<Dialog>...</Dialog>`) হলো `children` prop-এরই syntax sugar।
- **Conditional rendering নিরাপদ:** `const footer = <Footer />` লিখলেই Footer render হয় না — এটা শুধু একটা object (সস্তা)। Render হয় তখনই, যখন কোনো component তার return-এ ওটা বসায় (এখানে `ModalDialog` খুললে)। এজন্যই React Router-এর `<Route element={<Page />} />` নিরাপদ।
- **Default props via `cloneElement`:** Button icon-কে clone করে default (size/color) বসায়, কিন্তু `...icon.props` দিয়ে consumer-এর দেওয়া prop override করতে দেয়।
  - ⚠️ **ফাঁদ:** `...icon.props` ভুলে গেলে consumer-এর `color="red"` কখনো পৌঁছাবে না — icon-এর API ভেঙে যায়। তাই pattern-টা ভঙ্গুর, শুধু simple case-এ ব্যবহার করো।

---

## 📝 Exercises (তুমি করবে)

প্রতিটা করে `npm run dev`-এ দেখো, তারপর নিজেকে "কেন এমন হলো?" জিজ্ঞেস করো।

**EX-1 · override প্রমাণ করো**
`config-button.jsx`-এ `newProps` থেকে `...icon?.props` সরাও। এখন App-এর "Override red" button-এ icon লাল হবে না কেন? আবার যোগ করে ঠিক করো।

**EX-2 · নতুন default rule**
Button-এ `isDisabled` prop যোগ করো। disabled হলে icon-এর default color হবে `gray`। (hint: `defaultIconProps`-এ শর্ত বসাও, আর button-এ `disabled` attribute দাও।)

**EX-3 · header prop**
`config-modal-dialog.jsx`-এ `children`/`footer`-এর পাশাপাশি একটা `header` element prop যোগ করো, উপরে `.content`-এর আগে বসাও। App-এ একটা title পাঠাও।

**EX-4 · conditional rendering নিজের চোখে**
`icons.jsx`-এর `Loading`-এ একটা `console.log('Loading rendered')` বসাও (return-এর আগে)।
- page load-এ dialog বন্ধ থাকা অবস্থায় log আসে? (footer-এর ভেতরে Loading আছে, কিন্তু dialog বন্ধ)
- "Open dialog" চাপলে তবেই আসে কিনা দেখো — কেন? (উত্তর: element তৈরি ≠ render)

**EX-5 · ThreeColumns দিয়ে খেলা**
column গুলোতে `<Button>`, `<ModalDialog>` এমনকি আরেকটা `<ThreeColumnsLayout>` বসিয়ে দেখো — layout কিছু না জেনেও সব render করে।

---

## 🔑 Key takeaways

1. Config prop-এর বদলে পুরো **element prop** দাও → flexibility।
2. `children` = শুধু prop; nested syntax = sugar।
3. Element **তৈরি** মানে **render নয়** — conditional rendering নিরাপদ।
4. Default দিতে `cloneElement`, কিন্তু **সবসময় `...icon.props` দিয়ে override করতে দাও**।
5. এই pattern ভঙ্গুর — জটিল হলে পরের অধ্যায়ের **render props** ভালো।
