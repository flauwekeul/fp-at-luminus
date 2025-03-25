---
layout: cover
lineNumbers: true
theme: default
title: Functional Programming @ Luminus
transition: slide-left
---

# Functional Programming<br>@ Luminus

---
layout: center
---

<div class="text-center">
  <img src="/avatar.svg" alt="Abbe Keultjes" class="h-24 mx-auto mb-5 font-sans" />
  <h1 class="!text-8xl mb-5">Abbe Keultjes</h1>

  <img src="/io-logo.svg" alt="iO" class="h-36 mx-auto mb-5" />

  <img src="/logo-github.svg" alt="flauwekeul@github" class="inline-block h-7 mr-2" />
  <a href="https://github.com/flauwekeul">github.com/flauwekeul</a>
  <br>
  <span class="text-4xl mr-1 align-middle">@</span>
  <a href="mailto:abbe.keultjes@iodigital.com">abbe.keultjes@iodigital.com</a>
</div>

<!--
* Didn't study IT, self-taught
* 15 years experience
* OOP background
* FP experts mean well, but they often use too much jargon or make it seem too easy
-->

---

## What is FP?

<v-clicks>

* Functions as the main building blocks
* Immutable data structures
* Data separated from behavior
* "Pipelines"
* Isolated side effects
* 2 "variants": The Haskell Way and The Clojure Way

</v-clicks>

---

<h2 class="mb-3">Which do you prefer?</h2>

<div class="flex gap-5">
  <div>

```js
function getPublishedPageTitlesByAuthor(pages) {
  const titlesByAuthor = {};
  for (const page of pages) {
    if (page.isPublished) {
      titlesByAuthor[page.author] ??= [];
      titlesByAuthor[page.author].push(page.title);
    }
  }

  const result = [];
  for (const titles of Object.values(titlesByAuthor)) {
    result.push(...titles);
  }

  return result;
}
```

  </div>
  <div>

```js
function getPublishedPageTitlesByAuthor(pages) {
  return flow(pages, [
    filter(prop('isPublished')),
    groupBy(prop('author')),
    map(map(prop('title'))),
  ]);
}
```

  </div>
</div>

<blockquote v-click cite="https://www.youtube.com/watch?v=SxdOUGdseq4&t=423s" class="mt-3 !p-5">
  <p class="text-2xl italic !mb-3">"If you want everything to be familiar, you'll never learn anything new."</p>
  <footer class="!opacity-50">
    — Rich Hickey,
    <cite>
      <a href="https://www.youtube.com/watch?v=SxdOUGdseq4&t=423s" target="_blank">Easy Made Simple</a>
    </cite>
  </footer>
</blockquote>

---

<div class="flex">
  <div class="flex-1 mr-5">
  <h2 class="mb-5">🚫 Imperative style</h2>

  <ol v-click="1" class="mb-3 text-sm">
    <li>Take bread and cut 2 even slices by pushing and pulling a knife through the bread</li>
    <li>Apply lump of butter on knife and apply uniformly to each slice</li>
    <li>Pull 3 leaves of lettuce and arrange evenly on bread</li>
    <li>…</li>
  </ol>

  <div v-click="3" class="mt-5 mb-3 h-36">

```js
// Sum these numbers:
const numbers = [1, 2, 3, 4, 5]
let result = 0
for (let i = 0; i < numbers.length; i++) {
  result += numbers[i]
}
result // 15
```

  </div>
  <ul class="text-sm">
    <li v-click="5">Implementation details</li>
    <li v-click="7">Requires <em>reading</em></li>
    <li v-click="9">Concerned with <em>how</em></li>
    <li v-click="11">Statements</li>
  </ul>
  </div>
  <div class="flex-1">
  <h2 class="mb-5">✅ Declarative style</h2>

  <ol v-click="2" class="mb-30 text-sm">
    <li>Make me a lettuce-tomato-cheese sandwich</li>
  </ol>

  <div v-click="4" class="mb-3 h-36">

```js
// Sum these numbers:
const numbers = [1, 2, 3, 4, 5]

numbers.reduce(add) // 15
```

  </div>

  <ul class="text-sm">
    <li v-click="6">Abstraction</li>
    <li v-click="8">Requires <em>knowledge</em></li>
    <li v-click="10">Concerned with <em>what</em></li>
    <li v-click="12">Expressions</li>
  </ul>
  </div>
</div>

---

## Advantages of FP

<v-clicks>

* ✅ More expressive code
* ✅ Better domain models
* ✅ Less complexity
* ✅ Easy testing

</v-clicks>

---

## Challenges of FP

<v-clicks depth="2">

* 🤔 Unfamiliar for most
  * ⚔️ But unfamiliarity can be conquered
* 😩 Takes quite some practice
  * 👨‍💻 But there are plenty of (small) real-life use cases
* 🧑‍🏫 Hard to persuade (enough) colleagues
  * But keep trying 😅
* 🌡️ Pushes TypeScript to its limits
  * 🤓 But at least you get better at TypeScript

</v-clicks>

---

<h2 class="mb-13">✋ Before we start</h2>

<div v-click class="mb-13 text-2xl text-center">
  <a href="https://github.com/flauwekeul/workshop-fp-fundamentals" target="_blank">
  github.com/flauwekeul/fp-at-luminus
  </a>
</div>

<div class="grid grid-cols-2 gap-5">
  <ul>
    <li v-click><span v-mark.strike.red="3">Copilot / AI Assistant</span> 🚫🤖</li>
    <li v-click="4">Team up! 🤝</li>
  </ul>
</div>

<!--
Don't forget: `npm install`.
-->

---
layout: center
---

# Functions

---

<h2 class="mb-8">🧐 First-class functions</h2>

<p class="!opacity-100">Functions can be…</p>

<div class="flex">
  <div v-click class="flex-1 mr-5">

  Assigned to variables

```js
const one = () => 1;
const fn = one;

fn(); // 1
```

  </div>
  <div v-click class="flex-1 mr-5">

  Passed to functions

```js
const call = (fn) => fn();
const two = () => 2;

call(two); // 2
```

  </div>
  <div class="flex-1">

  <v-click>

  Returned from functions

```js
const identity = (x) => x;
const three = () => 3;
const callThree = identity(three);
callThree(); // 3
```

  </v-click>

  <div v-click class="mt-5">

```js
const add = (x) => (y) => x + y;
const add3To = add(3);

add3To(5); // 8
```

  </div>
  </div>
</div>

---
layout: center
---

<h2 class="text-center mb-20">
  🧑‍💻 Exercise <strong class="text-6xl">01</strong>
  <div class="mt-5">⏰ 15 minutes</div>
</h2>

Look in the `/exercises` folder.

To run tests: `npm t`.

---

<h2 class="mb-5">🧑‍🎨 Function composition</h2>

<div v-click class="mb-5">

```ts
const increment = (x: number) => x + 1;
const double = (x: number) => x * 2;
const quarter = (x: number) => x / 4;
```

</div>

<div v-click class="mb-5">

```ts
function compute(n: number) {
  const a = increment(n);                     // n + 1
  const b = double(a);                        // (n + 1) * 2
  return quarter(b);                          // ((n + 1) * 2) / 4
}
```

</div>

<div v-click class="mb-5">

```ts
function compute(n: number) {
  return quarter(double(increment(n)));       // ((n + 1) * 2) / 4
}
```

</div>

<div v-click>

```ts
function compute(n: number) {
  return pipe(n, increment, double, quarter); // n | +1 | *2 | /4
}
```

</div>

---
layout: center
---

# [RemedaJS](https://remedajs.com/)

---
layout: center
---

<h2 class="text-center mb-20">
  🧑‍💻 Exercises <strong class="text-6xl">02</strong>, <strong class="text-6xl">03</strong> and <strong class="text-6xl">04</strong>
  <div class="mt-5">⏰ 20 minutes</div>
</h2>

---
layout: center
---

# Data Oriented Programming (DOP)

<!-- ## What is DOP?

<v-clicks>

Data is a first-class citizen:

</v-clicks>

<v-clicks depth="2">

* ✂️ Separation between data and behavior
  * (Pure) functions for behavior
  * No classes
* <span text-cyan-600 mx-1>{}</span> Data is represented with generic data structures
  * Primitives or arrays/objects
  * No classes
* 💎 Data is treated as immutable
  * New versions of data are created
  * Data isn't mutated in-place
* 📄 Separate data shape from data value
  * Define the "shape" of data using data
  * Types don't have to be strict everywhere

</v-clicks> -->

<!--
todo: work out:
- At the edges of a system you need runtime validation, in the rest of the system types suffice
- With DTOs schema and instance are complected

Important realization: types don't have to be strict everywhere. Specific code needs stricter types than generic code.
-->

---

<h2 mb-5>✂️ Separation between data and behavior</h2>

<div flex gap-5>
  <div flex-1>

  ### OOP

```ts
class Player {
  name: string;
  position: Position;

  move(newPosition: Position) {
    this.position = newPosition;
  }
}
```

  <v-clicks>

  * ✅ More control (data use is restricted)
  * 🚫 Harder to reuse
  * 🚫 Systems tend to be more complex
  * 🚫 Less setup when testing

  </v-clicks>

  </div>
  <div flex-1 v-click="5">

  ### DOP

```ts
const playerState: PlayerState = {
  name: string,
  position: { x: 10, y: 20 },
};

function move(state: PlayerState, newPosition: Position) {
  return {
    ...state,
    position: newPosition,
  }
}
```

  <v-clicks at="6">

  * ✅ Easier reuse in different contexts
  * ✅ Systems tends to be simpler
  * ✅ Easier to test
  * 🚫 Less encapsulation

  </v-clicks>

  </div>
</div>

---

<h2 mb-13><span text-cyan-600 mx-1>{ }</span> Data is represented with generic data structures</h2>

<blockquote v-click class="mt-3 !p-5">
  <p class="text-2xl italic !mb-3">"It is better to have 100 functions operate on one data structure than to have 10 functions
operate on 10 data structures."</p>
  <footer class="!opacity-50">
    — Alan Perlis (“Epigrams on Programming,” 1982)
  </footer>
</blockquote>

<!--
Array has `map`, `filter`, `reduce`. Why doesn't Object?
-->

---

<h2 mb-5>💎 Data is treated as immutable</h2>

<v-clicks>

* Simple to reason about
* Predictable behavior
* Data changes stay local vs temporal/spatial mutations
* Fast equality checks:
    ```ts
    function findContract(contract: Contract, contracts: Contract[]) {
      return contracts.find((c) => c === contract);
    }
    ```

</v-clicks>
