BACK_SERVICE=login_jwt_back

install:
	@docker compose run --rm $(BACK_SERVICE) npm install $(deps)

build:
	@docker compose run --rm $(BACK_SERVICE) npm run build

dev:
	@docker compose run --rm --service-ports $(BACK_SERVICE) npm run dev

lint/check:
	@docker compose run --rm $(BACK_SERVICE) npm run eslint:check

lint/fix:
	@docker compose run --rm $(BACK_SERVICE) npm run eslint:fix
