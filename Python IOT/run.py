from flask import Flask, render_template, request, url_for, flash, redirect
from flask_sqlalchemy import SQLAlchemy
from forms import LoginForm, RegistrationForm
# from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
# from flask_wtf.csrf import CSRFProtect
# from flask_bcrypt import Bcrypt
# from flask_mail import Mail, Message
import json
from datetime import datetime
import io
import requests
import re
import matplotlib.pyplot as plt
import base64

app = Flask(__name__)

app.config['SECRET_KEY'] = 'PythONI0TS3CR3T'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"


posts = [
    {
        'author': 'Corey Schafer',
        'title': 'Blog Post 1',
        'content': 'First post content',
        'date_posted': 'April 20, 2018'
    },
    {
        'author': 'Jane Doe',
        'title': 'Blog Post 2',
        'content': 'Second post content',
        'date_posted': 'April 21, 2018'
    }
]


@app.route('/')
@app.route('/home')
def index():
    return render_template('home.html', var=posts)


@app.route('/about')
def about():
    return render_template('about.html', title='About')


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == 'test@gmail.com' and form.password.data == "123":
            flash('You have been logged in!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html', title='Login', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f'Account created for {form.username.data}!', "success")
        return redirect(url_for('index'))
    return render_template('register.html', title='Register', form=form)


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/plot')
def plotting():
    a = ReadAPI()
    print(a)
    plt.xlabel('Time')
    plt.ylabel('Temp (deg C)')
    plt.xticks(rotation=90)
    plt.subplots_adjust(bottom=0.30)
    plt.plot(list(a.keys().sort()), list(a.values()))
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    plt.show()
    return '<img src="data:image/png;base64,{}">'.format(plot_url)


def formatDateTime(dateTime):
    a = re.sub(r'[A-Z]', ' ', dateTime).rstrip().split()
    b = a[0].split('-')
    b[0], b[1] = b[2], b[1]
    b = '-'.join(b[:2])
    # print(b)
    return f"{b} {a[1]}"


def ReadAPI():
    response = requests.get("https://api.thingspeak.com/channels/1585193/feeds.json?results=10000")
    a = {}
    data = response.json()
    for i in data['feeds']:
        print(i['field1'], i['created_at'])
        time = formatDateTime(i['created_at'])
        print(time)
        a.update({time: i['field1']})
    return a


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
