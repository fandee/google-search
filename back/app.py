from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy as SQL
from flask_cors import CORS
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///search.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQL(app)
migrate = Migrate(app, db, render_as_batch=True)

class Search(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=True, nullable=False)
    count = db.Column(db.Integer, nullable=False)
    is_searched = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Searches {self.id} {self.count} "{self.title}" {self.is_searched}>'


@app.route('/get', methods=['POST'])
def get():
    data = request.json
    searches = []
    # top recent searches based on search query
    searches = [{"title": s.title, "is_searched": s.is_searched} for s in Search.query
                        .filter(Search.title.startswith(data['search_query']))
                        .filter(Search.is_searched == True)
                        .order_by(Search.count.desc())
                        .limit(5)
                        .all()]
    left = 5 - len(searches)
    searches += [{"title": s.title, "is_searched": s.is_searched} for s in Search.query
                        .filter(Search.title.startswith(data['search_query']))
                        .filter(Search.is_searched == False)
                        .order_by(Search.count.desc())
                        .limit(left)
                        .all()]
    return jsonify(statusCode=200, data=searches)


@app.route('/put', methods=['PUT'])
def update():
    try:
        data = request.json
        search = Search.query.filter(Search.title == data['search_query']).all()
        if not search:
            search = Search(title=data['search_query'], count=1, is_searched=True)
            db.session.add(search)
        else:
            search[0].is_searched = True
            search[0].count += 1
        db.session.commit()
        return jsonify(statusCode=200,
                        message="updated")
    except:
        return jsonify(statusCode=0,
                message="error")


@app.route('/remove', methods=['PUT'])
def remove():
    try:
        data = request.json
        search = Search.query.filter(Search.title == data['search_query']).all()[0]
        print(search)
        search.is_searched = False
        db.session.commit()
        return jsonify(statusCode=200,
                        message="deleted")
    except:
        return jsonify(statusCode=0,
                        message="error")


if __name__ == '__main__':
    app.run(debug=True)
