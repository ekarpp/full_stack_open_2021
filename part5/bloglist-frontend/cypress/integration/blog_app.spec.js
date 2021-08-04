describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('log in')
  })

  describe('Login', function() {
    beforeEach(function() {
      const user = {
        name: 'admin',
        username: 'admin',
        password: 'admin'
      }

      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
      cy.contains('log in').click()
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('foo')
      cy.get('#password').type('bar')
      cy.get('#login').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        name: 'admin',
        username: 'admin',
        password: 'admin'
      }

      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
      cy.contains('log in').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login').click()
    })

    it('A blog can be created', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create').click()
      cy.contains('a new blog "title" by "author" added')
    })

    it('a blog can be liked', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create').click()
      cy.contains('a new blog "title" by "author" added')
      cy.get('#toggleBlog-title').click()
      cy.get('#likeBlog-title').click()
      cy.contains('liked blog "title"')
    })

    it('A blog can be deleted', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#create').click()
      cy.contains('a new blog "title" by "author" added')
      cy.get('#toggleBlog-title').click()
      cy.get('#deleteBlog-title').click()
      cy.contains('deleted blog "title"')
    })
  })
})
