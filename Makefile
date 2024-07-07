.PHONY: build push release

build-backend:
	docker build --platform linux/amd64 -t registry.heroku.com/devops-dashboard-backend/web -f backend/Dockerfile ./backend

push-backend:
	docker push registry.heroku.com/devops-dashboard-backend/web

release-backend:
	heroku container:release web --app devops-dashboard-backend

build-frontend:
	docker build --platform linux/amd64 -t registry.heroku.com/devops-dashboard-frontend/web -f frontend/Dockerfile ./frontend

push-frontend:
	docker push registry.heroku.com/devops-dashboard-frontend/web

release-frontend:
	heroku container:release web --app devops-dashboard-frontend
