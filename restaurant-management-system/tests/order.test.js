// const request = require('supertest');
// const app = require('../server'); // Import your Express app or server
// const UserRepository = require('../src/repositories/userRepository'); // Assuming the path
// const sequelize = require('../src/config/db'); // DB instance (e.g., Sequelize)

// jest.mock('../src/repositories/userRepository'); // Mock the UserRepository
// jest.mock('../src/models/Users/user'); // Mock the User model if needed

// describe('POST /api/user/register', () => {

//     beforeAll(async () => {
//       await sequelize.sync({ force: true }); // Reset DB before tests
//     });
  
//     it('should successfully register a new user', async () => {
//       const newUser = {
//         email: 'testuser@example.com',
//         password: 'testpassword',
//       };
  
//       // Mocking UserRepository's create method to return a user object
//       UserRepository.prototype.create.mockResolvedValue({
//         id: 1,
//         ...newUser,
//       });
  
//       const response = await request(app).post('/api/user/register').send(newUser);
  
//       expect(response.status).toBe(201);
//       expect(response.body).toHaveProperty('id');
//       expect(response.body).toHaveProperty('email', newUser.email);
//     });
  
//     it('should return an error if the email already exists', async () => {
//       const existingUser = {
//         email: 'existinguser@example.com',
//         password: 'testpassword',
//       };
  
//       // Simulate existing user in the database
//       UserRepository.prototype.findByEmail.mockResolvedValue(existingUser);
  
//       const response = await request(app).post('/api/user/register').send(existingUser);
  
//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('message', 'Email already exists');
//     });
  
//     it('should return an error if email is invalid', async () => {
//       const invalidEmailUser = {
//         email: 'invalidemail',
//         password: 'testpassword',
//       };
  
//       const response = await request(app).post('/api/user/register').send(invalidEmailUser);
  
//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('message', 'Invalid email');
//     });
  
//     it('should return an error if email is missing', async () => {
//       const userWithoutEmail = {
//         password: 'testpassword',
//       };
  
//       const response = await request(app).post('/api/user/register').send(userWithoutEmail);
  
//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('message', 'Email is required');
//     });
  
//     it('should return an error if password is missing', async () => {
//       const userWithoutPassword = {
//         email: 'testuser@example.com',
//       };
  
//       const response = await request(app).post('/api/user/register').send(userWithoutPassword);
  
//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('message', 'Password is required');
//     });
//   });
  
