namespace Backend.Core.Application.Dtos.Users;

public class AuthenticationResponse : RegisterResponse
{
    public List<string> Roles { get; set; }
    
}