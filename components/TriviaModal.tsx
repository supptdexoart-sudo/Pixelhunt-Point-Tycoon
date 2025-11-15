import React, { useState, useEffect } from 'react';
import { TriviaQuestion } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface TriviaModalProps {
  isOpen: boolean;
  question: TriviaQuestion | null;
  onAnswer: (isCorrect: boolean) => void;
  onClose: () => void;
  resultMessage: string | null;
}

export const TriviaModal: React.FC<TriviaModalProps> = ({ isOpen, question, onAnswer, onClose, resultMessage }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setSelectedAnswer(null), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleAnswer = (answer: string) => {
        if (resultMessage) return;
        setSelectedAnswer(answer);
        onAnswer(answer === question?.correctAnswer);
    };

    useEffect(() => {
        if (resultMessage) {
            const timer = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(timer);
        }
    }, [resultMessage, onClose]);

    const getButtonClass = (option: string) => {
        if (!resultMessage) return 'bg-cyan-700 hover:bg-cyan-600';
        if (option === question?.correctAnswer) return 'bg-green-600';
        if (option === selectedAnswer && option !== question?.correctAnswer) return 'bg-red-700';
        return 'bg-gray-800 opacity-60';
    };

    if (!isOpen || !question) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="pixel-box p-6 w-full max-w-2xl text-center relative text-white" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 pixel-button bg-red-700 text-lg px-3 py-1" aria-label={t('trivia_close_aria')}>&times;</button>
                <h2 className="text-xl sm:text-2xl text-shadow-hard text-yellow-300 mb-4">{question.question}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {question.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            disabled={!!resultMessage}
                            className={`pixel-button w-full text-left p-4 text-sm sm:text-base transition-colors ${getButtonClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="mt-4 h-12 flex items-center justify-center">
                    {resultMessage && (
                         <p className={`text-lg text-shadow-hard ${resultMessage.includes(t('trivia_reward_relic')) || resultMessage.includes(t('trivia_reward_points')) ? 'text-green-400' : 'text-red-500'}`}>{resultMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
};