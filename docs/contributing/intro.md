---
sidebar_position: 1
---

# Contributing

LUX is a project that anyone can contribute to. We believe in open discussions, constructive criticism and new ideas. If you see something that can be improved, [open an issue](https://github.com/upskiller-xyz/server_lux/issues/new) or [edit the docs](https://github.com/upskiller-xyz/docs.upskiller.xyz/issues/new).

A good way to start is searching for _good first issue_ tags. When you find one you feel ready to work on, create a separate branch and make a pull request to the _master_ when you are done. 

If you feel uncertain about anything, start a discussion under the relevant issue or [contact us](mailto:alejandro.pacheco@upskiller.xyz) directly.


## What you need to know

Knowing the details of daylight simulation is desired but not required to contribute to this project. You can learn by doing or read the [overview](https://docs.upskiller.xyz/docs/lux-live/intro) section.

<details>
<summary>Frameworks per project</summary>

- Python (Simulation engine, pre- and postprocessing)
- C# and Revit API (plugin development)
- Grasshopper and RhinoCommon (computational geometry)
- Typescript, ifc.js, three.js (web development)

</details>

## Project Structure

![architecture sketch](https://upskiller-website.s3.fr-par.scw.cloud/docs.lux/architecture_t.png)

The application is divided into several docker containers, one container responsible for one function.

These containers are not directly accessible via API; instead, they are connected to the _interface server_ that accepts the requests and directs them to the respective containers in the correct order. This design serves as an extra layer of protection and ensures uniform request and response structure as well as modularity. One container can be versioned, replaced, updated or removed without having any effect on other services.

The _interface server_ can be connected to different user interfaces via the same API requests. The idea with the user interfaces is to keep them as light as possible, keeping all the operations on the server side (as much as possible).


## Contributing Guidelines

Follow existing code style. We hold ourselves to [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) with elements of [FP](https://en.wikipedia.org/wiki/Functional_programming) and fancy [software design patterns](https://refactoring.guru/design-patterns). 

Make sure your development starts with [one of the templates](/docs/contributing/templates) if you are starting a new repo. Any project or feature starts with unit tests. 

Make sure you don't forget to comment your thinking process both in the code and in the related issues and PR discussions. No one can read minds! :) And, of course, every new development should be reflected in the [documentation](https://github.com/upskiller-xyz/docs.upskiller.xyz).

## Support

[Open an issue](https://github.com/upskiller-xyz/Lux/issues/new) or [get in touch](mailto:upskiller@knivkit.com) if you need help. We are always happy to help each other learn and grow.
