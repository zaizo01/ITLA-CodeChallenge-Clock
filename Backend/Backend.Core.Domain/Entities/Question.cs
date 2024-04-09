namespace Backend.Core.Domain.Entities
{
    public class Question
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public int Level { get; set; }
        public string IncorrectAnswser1 { get; set; }
        public string IncorrectAnswser2 { get; set; }
        public string IncorrectAnswser3 { get; set; }
        public string CorrectAnswer { get; set; }
    }
}