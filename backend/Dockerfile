# Use the official Python image as the base
FROM python:3.10

# Set the working directory
WORKDIR /app

# Set environment variables
ENV POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1

# Install Poetry
RUN set -xe
RUN curl -sSL https://install.python-poetry.org | python3 - --git https://github.com/python-poetry/poetry.git@master

# Add Poetry to PATH
ENV PATH="/root/.local/bin:$PATH"
ENV FLASK_APP=run.py

# Copy the project files
COPY pyproject.toml poetry.lock /app/

# Install project dependencies
RUN poetry install --no-dev

# Copy the rest of the project files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["python", "run.py"]