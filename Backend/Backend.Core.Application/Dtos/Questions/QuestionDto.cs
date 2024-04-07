namespace Backend.Core.Application.Dtos.Questions;

public class QuestionDto
{
    public string Id { get; set; }
    public string Description { get; set; }
    public string Level { get; set; }
    public string CorrectAnswer { get; set; }
}