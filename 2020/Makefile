test: FORCE
	ls **/*.ts | entr deno test --allow-read
FORCE: ;

fix: fmt lint
fmt:
	deno fmt
lint:
	deno --unstable lint
