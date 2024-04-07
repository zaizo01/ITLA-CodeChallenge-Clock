using AutoMapper;
using Backend.Core.Application.Dtos.Questions;
using Backend.Core.Application.Features.Questions.Command;
using Backend.Core.Application.Features.Questions.Queries;
using Backend.Core.Domain.Entities;

namespace Backend.Core.Application.Mappings;

public class QuestionsMapping : Profile
{
    public QuestionsMapping()
    {
        CreateMap<CreateQuestionsCommand, Question>()
            .ForMember(x => x.Id, opt => opt.Ignore())
            .ReverseMap();
        
        CreateMap<QuestionDto, Question>()
            .ReverseMap();
    }
}