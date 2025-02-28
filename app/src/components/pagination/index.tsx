import React, { useContext } from 'react'
import styled from 'styled-components/native'
import { TouchableWithoutFeedback, View } from 'react-native'
import { Text } from '@components'
import { AppContext } from '@contexts'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
`

const PageButton = styled.View<{ active?: boolean; disabled?: boolean }>`
  padding: 8px 12px;
  margin: 0 4px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  min-width: 40px;
`

const Touchable = styled.TouchableWithoutFeedback`
  cursor: pointer;
`

const ArrowButton = styled.View<{ disabled?: boolean }>`
  padding: 8px;
  margin: 0 4px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const { colors } = useContext(AppContext)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Touchable key={i} onPress={() => handlePageChange(i)}>
          <PageButton
            active={i === currentPage}
            style={{
              backgroundColor: i === currentPage ? colors.active : 'transparent',
              borderWidth: 1,
              borderColor: i === currentPage ? colors.active : colors.border,
            }}
          >
            <Text
              b2
              style={{
                color: i === currentPage ? colors.textPrimaryButton : colors.text,
              }}
            >
              {i}
            </Text>
          </PageButton>
        </Touchable>
      )
    }
    return pages
  }

  return (
    <PaginationContainer>
      <Touchable onPress={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ArrowButton disabled={currentPage === 1}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={currentPage === 1 ? colors.disabled : colors.text}
          />
        </ArrowButton>
      </Touchable>

      {renderPageNumbers()}

      <Touchable onPress={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <ArrowButton disabled={currentPage === totalPages}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={currentPage === totalPages ? colors.disabled : colors.text}
          />
        </ArrowButton>
      </Touchable>
    </PaginationContainer>
  )
}