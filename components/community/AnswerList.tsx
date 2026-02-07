const AnswerList = ({ answers }: { answers: { id: string; body: string }[] }) => {
  return (
    <div className="space-y-2">
      {answers.map((answer) => (
        <div key={answer.id} className="rounded-2xl border border-ink-200 p-3 text-sm">
          {answer.body}
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
