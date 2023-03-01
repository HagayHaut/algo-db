# algoDB

A safe place for algorithm solutions.

![logo](/assets/images/logo.png)

Store your solutions, notes, and resources. Find how others solve the same challenges. Visit the live site <del>[here](http://algo-db.hagayhaut.com/)</del>. (Heroku free tier is no more 😥)

## As User

To use the application, sign-up with a new account or login to an existing account. This app is secured by Ruby on Rails and BCrypt password salting and hashing. 

## Run Locally

Fork and clone this repo and open with code editor. You must have the following installed:
- Ruby `^2.7.4`
- Rails `^7.0.3`
- Node `^16.14.0`
- React `^18.2.0`

To install rails dependencies
```bash
bundle
```
 For React dependencies, from the root of the project
 ```bash
 npm i --prefix client
 ```
 Migrate and seed the PostgreSQL database
 ```
rails db:migrate db:seed
 ```
 Start the backend server
 ```
rails s
 ```
Open the application in your browser
```
npm start --prefix client
```
## Built With
1. [React.js](https://reactjs.org/)
2. [Ruby on Rails](https://rubyonrails.org/)
3. [BCrypt](https://github.com/bcrypt-ruby/bcrypt-ruby)
4. [Styled Components](https://styled-components.com/)
5. [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
6. [React Markdown](https://github.com/remarkjs/react-markdown)



### Discover Solutions 

Visit the *Explore* page, where you can find all user solutions for each challenge on the site. Clicking on a challenge will open load the challenge and its solutions into the main window:

![challenge](/assets/images/challenge.png)

Here you can view the challenge description and hint, as well as see all solutions submitted for that challenge. Each solution will show time & space complexities and author notes. 

### Styles & Language Support 

Users can choose between 25 different ways to style their code, with syntax highlighting support for 22 programming languages. 

![challenge](/assets/images/codestyle.png)

### Discover Resources

Browse user-submitted resources, with the option to search by category and filter for free resources.

![challenge](/assets/images/resources.png)

### Contribute by Submitting

Help other users by sharing your solutions and adding challenges and resources!

![challenge](/assets/images/contribute.png)

### Monitor Your Progress

Click the *Users* tab view your progress, and check up on the progress of other users.

![challenge](/assets/images/users.png)

For more information, reach out to Hagay Haut on [GitHub](https://github.com/HagayHaut) or [LinkedIn](https://www.linkedin.com/in/hagay-haut/).
