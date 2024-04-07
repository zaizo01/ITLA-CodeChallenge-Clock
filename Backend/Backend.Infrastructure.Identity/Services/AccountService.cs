using Backend.Core.Application.Dtos.Users;
using Backend.Core.Application.Enums;
using Backend.Core.Application.Features.Users.Commands;
using Backend.Core.Application.Interfaces;
using Backend.Infraestructure.Identity.Entities;
using Microsoft.AspNetCore.Identity;

namespace Backend.Infraestructure.Identity.Services;

public class AccountService(UserManager<Users> userManager, SignInManager<Users> signInManager)
    : IAccountService
{
    public async Task<RegisterResponse> RegisterUser(RegisterUserCommand request)
    {
        try
        {
            var student = new RegisterResponse();

            var user = await userManager.FindByNameAsync(request.RegistrationNumber);
            if (user != null)
            {
                student.Error = $"El estudiante con matricula: {request.RegistrationNumber} ya se ha registrado";
                student.HasError = true;
                return student;
            }

            var studentCreated = new Users()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                RegistrationNumber = request.RegistrationNumber,
                Email = $"{request.RegistrationNumber}@itla.edu.do",
                UserName = request.RegistrationNumber,
                EmailConfirmed = true,
            };
            var result = await userManager.CreateAsync(studentCreated, request.PassWord);
            if (!result.Succeeded)
            {
                student.Error = "Error al intentar registrar al estudiante";
                student.HasError = true;
                return student;
            }

            await userManager.AddToRoleAsync(studentCreated, Roles.STUDENT.ToString());
            student.FirstName = studentCreated.FirstName;
            student.LastName = studentCreated.LastName;
            student.RegistrationNumber = studentCreated.RegistrationNumber;
            student.Id = studentCreated.Id;
            student.HasError = false;
            student.Error = "";

            return student;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<AuthenticationResponse> AuthenticationUser(AuthenticationUserCommand request)
    {
        try
        {
            var response = new AuthenticationResponse();
            var user = await userManager.FindByNameAsync(request.UserName);
            if (user == null)
            {
                response.Error = $"El estudiante con matricula:{request.UserName} no existe";
                response.HasError = true;
                return response;
            }

            var result = await signInManager.PasswordSignInAsync(request.UserName, request.PassWord, false,
                lockoutOnFailure: false);
            if (!result.Succeeded)
            {
                response.Error = $"Credenciales incorrectas, favor validar";
                response.HasError = true;
                return response;
            }

            var roles = await userManager.GetRolesAsync(user);
            response.Id = user.Id;
            response.FirstName = user.FirstName;
            response.LastName = user.LastName;
            response.RegistrationNumber = user.RegistrationNumber;
            response.Roles = roles.ToList();

            return response;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<AuthenticationResponse> GetUserByRegistrationNumber(string registrationNumber)
    {
        try
        {
            var response = new AuthenticationResponse();
            var user = await userManager.FindByNameAsync(registrationNumber);
            if (user != null)
            {
                response = await Mapping(user);
                return response;
            }

            response.Error = $"El estudiante con matricula:{registrationNumber} no existe";
            response.HasError = true;
            return response;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public async Task<bool> RemoveUser(string registrationNumber)
    {
        try
        {
            var user = await userManager.FindByNameAsync(registrationNumber);
            if (user is null) return false;
            await userManager.DeleteAsync(user);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            throw;
        }
    }

    public async Task SignOut()
    {
        await signInManager.SignOutAsync();
    }

    private async Task<AuthenticationResponse> Mapping(Users user)
    {
        var response = new AuthenticationResponse();
        var roles = await userManager.GetRolesAsync(user);
        response.Id = user.Id;
        response.FirstName = user.FirstName;
        response.LastName = user.LastName;
        response.RegistrationNumber = user.RegistrationNumber;
        response.Roles = roles.ToList();
        response.HasError = false;
        return response;
    }
}