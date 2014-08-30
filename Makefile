.PHONY: install requirements static


ifdef VIRTUAL_ENV
    ENV_PATH=$(VIRTUAL_ENV)
else
    ENV_PATH=./env
endif

PYTHON=$(ENV_PATH)/bin/python
PIP=$(ENV_PATH)/bin/pip


install: env var requirements static

requirements: env
	$(PIP) install -r requirements.txt --exists-action s

static:
	mkdir -p public/static
	mkdir -p public/media

	$(PYTHON) manage.py collectstatic \
	-i src \
	-i Gruntfile.js \
	-i node_modules \
	-i scss \
	-i *.less \
	-i *.json \
	--clear \
	--noinput \
	--verbosity 0

	find public/static/ -type f -not -name '*.gz' | xargs --max-procs 4 -I name sh -c 'echo gzip --best < name > name.gz'

env:
	virtualenv env

var:
	mkdir -p var/cache
	mkdir -p var/log