namespace Backend.Core.Domain.Entities
{
    public class Questions
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Level { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
