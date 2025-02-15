﻿public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; } 
}
public class RegisterUserDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
public class LoginRequestDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}

