test: FORCE
	ls **/*.ts | entr deno test
FORCE: ;

fix: fmt lint
fmt:
	deno fmt
lint:
	deno --unstable lint
