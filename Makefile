create-client:
	docker-compose up -d --force-recreate laplacian_client

create-api:
	docker-compose up -d --force-recreate laplacian_api

create-analyzer:
	docker-compose up -d --force-recreate laplacian_analyzer

create: create-client create-api create-analyzer

up:
	docker-compose up

restart:
	docker-compose up -d

down:
	docker-compose down

clean:
	docker-compose down --remove-orphans

install-client:
	docker-compose run --rm laplacian_client "npm install"

install-api:
	docker-compose run --rm laplacian_api "npm install"

install: install-client install-server

goto-client:
	docker-compose exec laplacian_client bash

goto-api:
	docker-compose exec laplacian_api bash

goto-analyzer:
	docker-compose exec laplacian_analyzer bash

logs:
	docker-compose logs -f
