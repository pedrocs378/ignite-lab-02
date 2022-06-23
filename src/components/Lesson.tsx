import { memo, useMemo } from 'react'
import { format, isPast } from 'date-fns'
import { Link } from 'react-router-dom'
import ptBR from 'date-fns/locale/pt-BR'
import { CheckCircle, Lock } from 'phosphor-react'

enum LESSON_TYPE {
  live = 'AO VIVO',
  class = 'Aula Prática'
}

type LessonProps = {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

function LessonComponent(props: LessonProps) {
  const lessonInfo = useMemo(() => {
    const isLessonAvailable = isPast(props.availableAt)
    const availableDateFormatted = format(props.availableAt, "EE' • 'dd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

    return {
      isLessonAvailable,
      availableDateFormatted
    }
  }, [props.availableAt])

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">
        {lessonInfo.availableDateFormatted}
      </span>

      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors">
        <header className="flex items-center justify-between">
          {lessonInfo.isLessonAvailable ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          
          <span className="text-xs rounded px-2 py-[0.125rem] text-white border border-green-300 font-bold">
            {LESSON_TYPE[props.type]}
          </span>
        </header>
        
        <strong className="text-gray-200 mt-5 block">
          {props.title}
        </strong>
      </div>
    </Link>
  )
}

export const Lesson = memo(LessonComponent, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.slug === nextProps.slug &&
    prevProps.type === nextProps.type &&
    prevProps.availableAt.toString() === nextProps.availableAt.toString()
  )
})
