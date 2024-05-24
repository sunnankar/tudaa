### Set up

```bash
$ bundle install
```

```bash
$ bundle exec vite install
```

Run `exe/dev` (added during installation) to start both Vite and Jekyll for development.

```bash
$ exe/dev
```

If overmind is already running. Remove ./.overmind.sock and try again

```bash
$ rm ./.overmind.sock
```

Alternatively, run `bin/vite dev` to start the Vite development server, and restart your Jekyll server with `bin/jekyll serve` once Vite is running.

View site on
Server address: http://127.0.0.1:4000/
