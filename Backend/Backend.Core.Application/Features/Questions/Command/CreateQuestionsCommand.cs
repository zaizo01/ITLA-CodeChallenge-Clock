using AutoMapper;
using Backend.Core.Application.Interfaces;
using Backend.Core.Domain.Entities;
using MediatR;

namespace Backend.Core.Application.Features.Questions.Command;

public class CreateQuestionsCommand : IRequest<CreateQuestionsCommand>
{
    public string Description { get; set; }
    public int Level { get; set; }
    public string CorrectAnswer { get; set; }
}

public class CreateQuestionsCommandHandler(IQuestionRepository questionRepository, IMapper mapper)
    : IRequestHandler<CreateQuestionsCommand, CreateQuestionsCommand>
{
    public async Task<CreateQuestionsCommand> Handle(CreateQuestionsCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entity = mapper.Map<Question>(request);
            return mapper.Map<CreateQuestionsCommand>(await questionRepository.AddAsync(entity));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}