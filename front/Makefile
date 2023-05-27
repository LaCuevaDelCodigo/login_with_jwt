SERVICE_NAME=login_jwt_front

install:
	docker compose run --rm $(SERVICE_NAME) npm install $(deps)

dev:
	docker compose run --rm --service-ports $(SERVICE_NAME) npm run dev

build:
	docker compose run --rm $(SERVICE_NAME) npm run build
