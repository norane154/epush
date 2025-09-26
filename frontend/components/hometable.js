// src/components/AppTable.js
import React, { useMemo, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const createDummyData = () => {
  const data = [];
  for (let i = 1; i <= 56; i++) {
    data.push({
      id: i,
      name: `App Name ${i}`,
      bundleId: `com.fpt.AppName${i}`,
      description: 'Production',
      createdAt: '20 Feb 2022',
      createdBy: 'quoctx',
      updatedAt: '20 Feb 2022',
      updatedBy: 'dungt66',
    });
  }
  return data;
};
const DUMMY_DATA = createDummyData();

const HEADER_H = 56;
const ROW_H = 64;
const PAGE_SIZE = 8;

/* ------------ rows ------------ */
const TableRow = ({ item, onView, onEdit, onDelete }) => (
  <View style={s.row}>
    <View style={[s.cell, s.appCell]}>
      <View style={s.appIcon} />
      <View>
        <Text style={s.appName}>{item.name}</Text>
        <Text style={s.appBundleId}>{item.bundleId}</Text>
      </View>
    </View>
    <Text style={[s.cell, { flex: 1.5 }]}>{item.description}</Text>
    <Text style={[s.cell, { flex: 1.5 }]}>{item.createdAt}</Text>
    <Text style={[s.cell, { flex: 1 }]}>{item.createdBy}</Text>
    <Text style={[s.cell, { flex: 1.5 }]}>{item.updatedAt}</Text>
    <Text style={[s.cell, { flex: 1 }]}>{item.updatedBy}</Text>
    <View style={[s.cell, s.actionsCell]}>
      <TouchableOpacity style={s.actionButton} onPress={() => onEdit?.(item)}>
        <Icon name="edit" size={16} color="#6b7280" />
      </TouchableOpacity>
      <TouchableOpacity style={s.actionButton} onPress={() => onView?.(item)}>
        <Icon name="eye" size={16} color="#6b7280" />
      </TouchableOpacity>
      <TouchableOpacity style={s.actionButton} onPress={() => onDelete?.(item)}>
        <Icon name="trash" size={16} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);

const TableHeader = () => (
  <View style={s.headerRow}>
    <Text style={[s.headerText, { flex: 2.5 }]}>Ứng dụng</Text>
    <Text style={[s.headerText, { flex: 1.5 }]}>Mô tả</Text>
    <Text style={[s.headerText, { flex: 1.5 }]}>Ngày tạo</Text>
    <Text style={[s.headerText, { flex: 1 }]}>Người tạo</Text>
    <Text style={[s.headerText, { flex: 1.5 }]}>Ngày sửa</Text>
    <Text style={[s.headerText, { flex: 1 }]}>Người sửa</Text>
    <Text style={[s.headerText, { flex: 1.5 }]}>Thao tác</Text>
  </View>
);

/* ------------ page jump ------------ */
const PageJump = ({ current, total, onJump }) => {
  const [open, setOpen] = useState(false);
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <View style={s.pageJumpWrap}>
      <TouchableOpacity style={s.pageJumpButton} onPress={() => setOpen((v) => !v)}>
        <Text style={s.pageJumpText}>{current}</Text>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} color="#595959" />
      </TouchableOpacity>
      {open && (
        <>
          <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={() => setOpen(false)} />
          <View style={s.pageJumpMenu}>
            {pages.map((p) => (
              <TouchableOpacity
                key={p}
                style={[s.pageJumpItem, p === current && s.pageJumpItemActive]}
                onPress={() => { onJump(p); setOpen(false); }}
              >
                <Text style={[s.pageJumpItemText, p === current && s.pageJumpItemTextActive]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

/* ------------ pagination ------------ */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX = 5;
  let start = Math.max(1, currentPage - Math.floor(MAX / 2));
  let end = Math.min(totalPages, start + MAX - 1);
  if (end - start + 1 < MAX) start = Math.max(1, end - MAX + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <View style={s.paginationControls}>
      <TouchableOpacity
        onPress={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        style={s.pageArrowButton}
      >
        <Icon name="chevron-left" size={18} color={currentPage === 1 ? '#bfbfbf' : '#595959'} />
      </TouchableOpacity>

      {pages.map((p) => (
        <TouchableOpacity
          key={p}
          style={[s.pageNumberContainer, currentPage === p && s.pageNumberActive]}
          onPress={() => onPageChange(p)}
        >
          <Text style={[s.pageNumberText, currentPage === p && s.pageNumberTextActive]}>{p}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        style={s.pageArrowButton}
      >
        <Icon name="chevron-right" size={18} color={currentPage === totalPages ? '#bfbfbf' : '#595959'} />
      </TouchableOpacity>

      <PageJump current={currentPage} total={totalPages} onJump={onPageChange} />
    </View>
  );
};

export default function AppTable({ onAdd, onView, onEdit, onDelete }) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DUMMY_DATA;
    return DUMMY_DATA.filter(
      (x) => x.name.toLowerCase().includes(s) || x.bundleId.toLowerCase().includes(s),
    );
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => { if (page > totalPages) setPage(1); }, [filtered.length, totalPages]);

  const data = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [page, filtered]);

  return (
    <View style={s.wrapper}>
      {/* toolbar */}
      <View style={s.toolbar}>
        <TouchableOpacity style={s.filterButton}>
          <Text style={s.filterText}>Tất cả</Text>
          <Icon name="chevron-down" size={20} color="#374151" />
        </TouchableOpacity>

        <View style={s.actionsContainer}>
          <TouchableOpacity style={s.addButton} onPress={onAdd}>
            <Text style={s.addButtonText}>Thêm ứng dụng</Text>
          </TouchableOpacity>

          <View style={s.searchContainer}>
            <Icon name="search" size={20} color="#bfbfbf" style={{ marginRight: 8 }} />
            <TextInput
              style={s.searchInput}
              placeholder="Tìm kiếm"
              placeholderTextColor="#bfbfbf"
              value={q}
              onChangeText={setQ}
            />
          </View>
        </View>
      </View>

      {/* table */}
      <View style={s.tableContainer}>
        <FlatList
          data={data}
          keyExtractor={(it) => String(it.id)}
          ListHeaderComponent={TableHeader}
          renderItem={({ item }) => (
            <TableRow item={item} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          )}
          stickyHeaderIndices={[0]}
          scrollEnabled={false}
          getItemLayout={(_, index) => ({ length: ROW_H, offset: ROW_H * index, index })}
        />
      </View>

      {/* footer */}
      <View style={s.paginationContainer}>
        <Text style={s.paginationText}>Hiển thị {data.length} trong {filtered.length} kết quả</Text>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 12,
  },

  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  actionsContainer: { flexDirection: 'row', alignItems: 'center' },
  filterButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 6, paddingVertical: 8, paddingHorizontal: 12 },
  filterText: { marginRight: 8, fontSize: 14 },
  addButton: { backgroundColor: '#00A2B9', borderRadius: 6, paddingVertical: 9, paddingHorizontal: 16, marginRight: 16 },
  addButtonText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', borderRadius: 6, paddingHorizontal: 12, width: 280, height: 40 },
  searchInput: { flex: 1, height: '100%', fontSize: 14, borderWidth: 0, ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}) },

  tableContainer: { flexGrow: 0, borderWidth: 1, borderColor: '#f0f0f0', borderRadius: 8, overflow: 'hidden' },
  headerRow: { flexDirection: 'row', backgroundColor: '#fafafa', borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingHorizontal: 16, height: HEADER_H, alignItems: 'center' },
  headerText: { fontSize: 14, color: 'rgba(0,0,0,0.85)', fontWeight: '500' },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f0f0f0', alignItems: 'center', paddingHorizontal: 16, height: ROW_H },
  cell: { fontSize: 14, color: 'rgba(0,0,0,0.65)' },
  appCell: { flex: 2.5, flexDirection: 'row', alignItems: 'center' },
  appIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 12 },
  appName: { fontWeight: '600', color: 'rgba(0,0,0,0.85)', fontSize: 14 },
  appBundleId: { fontSize: 13, color: '#8c8c8c' },
  actionsCell: { flex: 1.5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  actionButton: { padding: 4, marginRight: 12 },

  paginationContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 24, position: 'relative' },
  paginationText: { fontSize: 14, color: 'rgba(0,0,0,0.65)', position: 'absolute', left: 0 },
  paginationControls: { flexDirection: 'row', alignItems: 'center' },
  pageArrowButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  pageNumberContainer: { minWidth: 32, height: 32, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4 },
  pageNumberActive: { backgroundColor: '#b7bfc7ff' },
  pageNumberText: { fontSize: 14, color: 'rgba(0,0,0,0.85)' },
  pageNumberTextActive: { color: '#fff' },

  pageJumpWrap: { position: 'relative', marginLeft: 8 },
  pageJumpButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#d9d9d9', borderRadius: 6, paddingVertical: 7, paddingHorizontal: 10 },
  pageJumpText: { marginRight: 8, fontSize: 14 },
  pageJumpMenu: { position: 'absolute', top: 44, right: 0, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, minWidth: 120, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 4, zIndex: 20 },
  pageJumpItem: { paddingVertical: 10, paddingHorizontal: 12 },
  pageJumpItemActive: { backgroundColor: '#f0f7ff' },
  pageJumpItemText: { fontSize: 14, color: '#374151' },
  pageJumpItemTextActive: { color: '#1f2937', fontWeight: '600' },
  overlay: { position: 'absolute', left: -9999, top: -9999, width: 20000, height: 20000, zIndex: 10 },
});
