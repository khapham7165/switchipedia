import React, { useEffect, useState } from 'react'
import { BodyView, Pagination, ScreenTitle } from '@components'
import { useFetch } from '@hooks'
import { SwitchData } from '@interfaces'
import styled from 'styled-components/native'
import { SwitchCard } from './switch-card'
import { SCREEN } from '@constants'

const Container = styled(BodyView)`
  align-items: center;
`

const ItemsContainer = styled.View`
  padding: 8px;
  max-width: 1920px;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const CardContainer = styled.View`
  padding: 4px;
  width: 100%;
`

const SwitchesList = styled.ScrollView``

const ScreenTitleView = styled(ScreenTitle)`
  padding-left: 4px;
  padding-right: 4px;
`

type PaginatedResponse = {
  items: SwitchData[]
  meta: {
    totalCount: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

type SwitchListProps = any

export const SwitchList = (props: SwitchListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)

  const [
    fetchSwitches,
    { data: response, loading: fetchSwitchLoading, error: fetchSwitchError },
  ] = useFetch('/switch/all', { page: 1, limit: pageSize })

  // Initial fetch
  useEffect(() => {
    fetchSwitches()
  }, [])

  // Fetch when page changes
  useEffect(() => {
    fetchSwitches({ page: currentPage, limit: pageSize })
  }, [currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const paginatedResponse = response as PaginatedResponse | undefined
  const switches = paginatedResponse?.items || []
  const totalPages = paginatedResponse?.meta?.totalPages || 1

  return (
    <SwitchesList>
      <Container>
        <ItemsContainer>
          <ScreenTitleView>{SCREEN.SWITCH_LIST}</ScreenTitleView>
          {(fetchSwitchLoading
            ? [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }]
            : switches
          )?.map((item) => {
            return (
              <CardContainer key={item._id}>
                <SwitchCard
                  item={item as SwitchData}
                  loading={fetchSwitchLoading}
                  onPress={() =>
                    props.navigation.navigate(SCREEN.SWITCH_DETAIL, {
                      id: item._id,
                    })
                  }
                />
              </CardContainer>
            )
          })}

          {!fetchSwitchLoading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </ItemsContainer>
      </Container>
    </SwitchesList>
  )
}