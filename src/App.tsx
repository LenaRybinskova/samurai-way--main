import React from 'react';
import './App.css';


function App() {
    return (
        <div className="app-wrapper">
            <header className="header">
                <img
                    src="https://catherineasquithgallery.com/uploads/posts/2021-02/1612893370_194-p-krasnii-prozrachnii-fon-222.png"
                    alt=""/>
            </header>
            <nav className="nav">
                <div>
                    <a>Profile</a>
                </div>
                <div>
                    <a>Messages</a>
                </div>
                <div>
                    <a>News</a>
                </div>
                <div>
                    <a>Music</a>
                </div>

            </nav>
            <div className="content"><img
                src="https://mobimg.b-cdn.net/v3/fetch/fe/fe9778a706308a25d2e6143e7bce5207.jpeg" alt=""/>Main content

                <div>ava+description</div>
                <div>my-posts
                    <div>new post</div>
                </div>
                <div>
                    <div>post1</div>
                    <div>post2</div>
                    <div>post3</div>
                </div>
            </div>
        </div>
    );
}

export default App;

