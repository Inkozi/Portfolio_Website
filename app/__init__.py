import logging
from flask import Flask
from flask_bootstrap import Bootstrap
from flask_static_digest import FlaskStaticDigest
from flask_minify import minify
from flask_login import LoginManager
from datetime import timedelta

flask_static_digest = FlaskStaticDigest()

app = Flask(__name__, static_folder='./static/')
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=15)

login_manager = LoginManager()
login_manager.init_app(app)

flask_static_digest.init_app(app)

# Configure Flask logging
app.logger.setLevel(logging.INFO)  # Set log level to INFO
handler = logging.FileHandler('app.log')  # Log to a file
app.logger.addHandler(handler)


minify(app=app, html=True, js=True, cssless=True)

bootstrap = Bootstrap(app)

#import blueprints
from app.photo_viewer import bp as photoviewer_bp, configure_login_manager as pv_login_config
app.register_blueprint(photoviewer_bp)

from app.harmony_app import bp as harmony_bp, configure_login_manager as harmony_login_config
app.register_blueprint(harmony_bp)

from app.music_fest import bp as musicfest_bp
app.register_blueprint(musicfest_bp)

#login configuration
pv_login_config(login_manager)
harmony_login_config(login_manager)

from app import routes
