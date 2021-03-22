using FluentValidation;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class ProjectValidator : AbstractValidator<Project>
    {
        public ProjectValidator()
        {
            RuleFor(x => x.ProjectName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.WorkSpaceId)
                .NotEmpty()
                .WithMessage("Project requires customer id");
            RuleFor(x => x.StartDate)
                .NotEmpty();
            RuleFor(x => x.EndDate)
                .NotEmpty();
        }
    }
}