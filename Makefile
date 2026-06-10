
start:
	docker-compose up -d

rebuild:
	docker-compose up --build -d

stop:
	docker-compose down

logs:
	docker-compose logs -f frontend server
