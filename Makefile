create-client:
	docker-compose up -d --force-recreate laplacian_client

create-analyzer:
	docker-compose up -d --force-recreate laplacian_analyzer

up:
	docker image rm -f tori/laplacian_analyzer
	docker build -t tori/laplacian_analyzer ./analyzer
	docker-compose up

restart:
	docker-compose up -d

down:
	docker-compose down

clean:
	docker-compose down --remove-orphans
	docker image rm -f tori/laplacian_analyzer

install-client:
	docker-compose run --rm laplacian_client "npm install"

goto-client:
	docker-compose exec laplacian_client bash

goto-analyzer:
	docker-compose exec laplacian_analyzer bash

logs:
	docker-compose logs -f
