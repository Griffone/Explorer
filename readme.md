# Technomunk's Github Pages

A place to showcase some of personal projects and abilities.

## ⚠ Disclaimer

The webpage does not work as intended on Internet Explorer. As this is a fun project it uses more
advanced functionalities of modern browsers. Additionally some browsers do not allow loading
additional files when viewing a local webpage. The `complex_dynamics.html` uses asynchronous
workers to compute the mandelbrot set in the background, relying on loading the script file. To run
the page locally supply `--allow-file-access-from-files` command line argument to your browser.

## Building

Instructions for building the website.

### 🔗 Requirements

- [npm](https://www.npmjs.com/)
- [Rust](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- cargo-generate: `cargo install cargo-generate`

### 🛠 First time setup

- Initialize dependency submodules: `git submodule foreach git submodule init`
- Update dependency submodules: `git submodule foreach git submodule update`
- Build wasm dependencies: `git submodule foreach wasm-pack build`
- Install JS dependencies: `npm install`

### 📨 Build static content

```sh
npm run build
```

## Local development

```sh
npm run serve
```

Goto http://localhost:8080
