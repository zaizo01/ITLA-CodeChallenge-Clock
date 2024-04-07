namespace Backend.Core.Domain.Entities
{
    public class Question
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public int Level { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
