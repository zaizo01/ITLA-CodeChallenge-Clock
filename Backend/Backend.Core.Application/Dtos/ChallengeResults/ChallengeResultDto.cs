namespace Backend.Core.Application.Dtos.ChallengeResults;

public class ChallengeResultDto
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public int Level { get; set; }
    public int CorrectAnswersCount { get; set; }
    public decimal MinutiesElapsed { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string RegistrationNumber { get; set; }
}