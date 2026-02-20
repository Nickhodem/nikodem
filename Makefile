dev:
	npm run dev

build:
	npm run build

start:
	npm run preview

deploy:
	npm run build && npx gh-pages -d dist --nojekyll

format:
	npx eslint . --fix

.PHONY: dev build start deploy format
