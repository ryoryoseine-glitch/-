const QuestionList = ({ questions }: { questions: { id: string; title: string }[] }) => {
  return (
    <div className="space-y-3">
      {questions.map((question) => (
        <div key={question.id} className="rounded-2xl border border-ink-200 p-3">
          <p className="text-sm font-semibold">{question.title}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
