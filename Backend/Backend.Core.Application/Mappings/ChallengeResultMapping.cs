using AutoMapper;
using Backend.Core.Application.Dtos.ChallengeResults;
using Backend.Core.Application.Features.ChallengeResults.Command;
using Backend.Core.Domain.Entities;

namespace Backend.Core.Application.Mappings;

public class ChallengeResultMapping : Profile
{

    public ChallengeResultMapping()
    {
        CreateMap<GetChallengeResult, ChallengeResult>()
            .ReverseMap();

        CreateMap<CreateChallengeResultCommand, ChallengeResult>()
        .ForMember(x => x.Id, opt => opt.Ignore())
        .ReverseMap();
            
    }
}
