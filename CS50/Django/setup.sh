#!/bin/bash
echo "Setting up virtual environment..."
python3 -m venv myEnv
source myEnv/bin/activate
echo "Installing dependencies..."
pip install -r requirements.txt
echo "Setup complete! Activate the environment with 'source myEnv/bin/activate' and run your project."
