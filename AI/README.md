## AI to predict the price traced from the its historical data for the future 10 trades

### Running the Django server


1. Create a virtual environment

```bash
pip install virtualenv

virtualenv venv      #venv is the name of the virtual environment

python -m virtualenv venv       #if above cmd didnt work then run this
```

2. Activate the virtual environment

```bash
source venv/bin/activate    #for linux or mac
.\venv\Scripts\activate     #for windows
```

3. Install the requirements

```bash
pip install -r requirements.txt
``` 

3. Change the directory to the Django directory

```bash
cd prediction
```

5. Run the server

```bash
python manage.py runserver 0.0.0.0:8008
```

### Running the AI

*Make sure to install virtualenv and all the requirements are installed*

1. Change the directory to the AI directory

```bash
cd src
```

2. We have 2 Models, 
    1. 3D-LSTM
    2. Multihead Attention based Transformer

3D LSTM model is in 
```bash
src/model1.ipynb
```

Multihead Attention based Transformer is in 
```bash
src/model2.ipynb
```