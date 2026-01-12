## Installation

1 - Cloner le repository :

    git clone git@github.com:Quentin-Arbona/tp-todo_sveltekit-sqlite.git

    cd tp-todo_sveltekit-sqlite

2 - Installer les dépendances :

    npm install

3 - Configurer les variables d'environnement

    cp .env.example .env

    Puis éditez `.env` et remplacez :
        - `your_api_key_here` par votre clé WeatherAPI

    Afin d'obtenir une clé api :
        - Créez un compte sur https://www.weatherapi.com/
        - Copiez votre clé API
        - Collez-la dans `.env`

4 - Lancer le serveur :

        npm run dev

5 - Ouvrir http://localhost:5173