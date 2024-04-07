using AutoMapper;
using Backend.Core.Application.Dtos.Questions;
using Backend.Core.Application.Interfaces;
using MediatR;

namespace Backend.Core.Application.Features.Questions.Queries;

public class GetAllQuestionQuery : IRequest<IEnumerable<QuestionDto>>
{
    public int Level { get; set; }
}

public class GetAllQuestionQueryHandler(IQuestionRepository questionRepository, IMapper mapper)
    : IRequestHandler<GetAllQuestionQuery, IEnumerable<QuestionDto>>
{
    public async Task<IEnumerable<QuestionDto>> Handle(GetAllQuestionQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var questions = await questionRepository.GetAllByLevelAsync(request.Level);
            return questions.Count <= 0 ? null : mapper.Map<List<QuestionDto>>(questions);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}