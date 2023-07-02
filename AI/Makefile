VENV_NAME := venv

.PHONY: venv start install

venv: $(VENV_NAME)/bin/activate

$(VENV_NAME)/bin/activate: requirements.txt
	test -d $(VENV_NAME) || python3 -m venv $(VENV_NAME)
	$(VENV_NAME)/bin/pip install -r requirements.txt
	touch $(VENV_NAME)/bin/activate

start: venv
	@echo "Activating virtual environment."
	@source $(VENV_NAME)/bin/activate

install: venv
	@echo "Running 'pip freeze > requirements.txt' in virtual environment."
	@source $(VENV_NAME)/bin/activate && $(VENV_NAME)/bin/pip freeze > requirements.txt
