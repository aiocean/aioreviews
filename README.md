# docs

This project is a VitePress site that is automatically built and deployed to GitHub Pages using GitHub Actions. It is written in TypeScript and JavaScript and uses npm for package management.

## Development

To install the project dependencies, run:

```bash
bun install
```

To start the development server, run:

```bash
bun run dev
```

This will start the VitePress development server, which will automatically reload the page as you make changes to the source files.

## Deployment

Every time a commit is pushed to the `main` branch, GitHub Actions will automatically build and deploy the site to GitHub Pages.

## Contributing

Contributions are welcome! Please make sure to test your changes locally before pushing them to the `main` branch.

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
