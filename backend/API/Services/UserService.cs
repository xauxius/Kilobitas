using API.Models;
using API.Services;
using BCrypt.Net;
using MongoDB.Driver;

namespace API.Services
{
public class UserService
{
    private readonly IMongoCollection<User> _users;

    public UserService(MongoDatabase db)
    {
        _users = db.Database.GetCollection<User>("Users");
    }

    public User Register(User user)
    {
        // Hash the password before storing it
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _users.InsertOne(user);
        return user;
    }

    public User Authenticate(string username, string password)
    {
        var user = _users.Find(u => u.Username == username).FirstOrDefault();

        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            return null;
        }

        return user;
    }
}
}