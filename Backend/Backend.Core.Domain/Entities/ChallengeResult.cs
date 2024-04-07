namespace Backend.Core.Domain.Entities
{
    public class ChallengeResult
    {
        public Guid Id { get; set; }
        public string? UserId { get; set; }
        public string? Level { get; set; }
        public int CorrectAnswersCount { get; set; }
        public decimal MinutiesElapsed { get; set; }

    }
}
